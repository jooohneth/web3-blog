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

}

export default Post;
  