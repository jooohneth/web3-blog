import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/css'
import dynamic from 'next/dynamic'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { contractAddress } from '../../config'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json'

const ipfsURI = 'https://ipfs.io/ipfs/'
const client = create('https://ipfs.infura.io:5001/api/v0')
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
  )

function Post(){
    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(true);
    const router = useRouter();
    const id = router.query;

    useEffect(()=>{
        fetchPost();
    }, [id])

    async function fetchPost(){

        if(!id) return;
    
        let provider;
        if (process.env.ENVIRONMENT === 'local') {
          provider = new ethers.providers.JsonRpcProvider()
        } else if (process.env.ENVIRONMENT === 'testnet') {
          provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
        } else {
          provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
        }
        const contract = new ethers.Contract(contractAddress, Blog.abi, provider);
        const val = await contract.fetchPost(id);
        const postId = val[0].toNumber();

        const ipfsUrl = `${ipfsURI}/${id}`;
        const response = await fetch(ipfsUrl);
        const data = await response.json();
        if(data.coverImage){
            let coverImagePath = `${ipfsUrl}/${data.coverImage}`;
            data.coverImagePath = coverImagePath;
        }
        data.id = postId;
        setPost(data);
    }

    async function savePostToIpfs() {
        try {
          const added = await client.add(JSON.stringify(post))
          return added.path
        } catch (err) {
          console.log('error: ', err)
        }
      }

    async function updatePost(){
        const hash = await savePostToIpfs();
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Blog.abi, signer);
        await contract.updatePost(post.id, post.title, hash, true);
        router.push("/");
    }

    if(!post) return;

    return (
        <div className={container}>
      {editing && (
          <div>
            <input
              onChange={e => setPost({ ...post, title: e.target.value })}
              name='title'
              placeholder='Give it a title ...'
              value={post.title}
              className={titleStyle}
            />
            <SimpleMDE
              className={mdEditor}
              placeholder="What's on your mind?"
              value={post.content}
              onChange={value => setPost({ ...post, content: value })}
            />
            <button className={button} onClick={updatePost}>Update post</button>
          </div>
        )}
      {!editing && (
          <div>
            {
              post.coverImagePath && (
                <img
                  src={post.coverImagePath}
                  className={coverImageStyle}
                />
              )
            }
            <h1>{post.title}</h1>
            <div className={contentContainer}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        )}
      <button className={button} onClick={() => setEditing(editing ? false : true)}>{ editing ? 'View post' : 'Edit post'}</button>
    </div>
  )
}

export default Post;
  