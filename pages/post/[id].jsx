import ReactMarkdown from 'react-markdown'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { AccountContext } from '../../context'
import { contractAddress, ownerAddress } from '../../config'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json'

function Post({post}){
    const account = useContext(AccountContext);
    const router = useRouter();
    const {id} = router.query;
    
    if(router.isFallback){
        return <div>Loading...</div>
    }

    return(
        <div>
            {post && (
                <div className={container}>
                    {ownerAddress === account && (
                        <div className={editPost}>
                            <Link href={`/edit-post/${id}`}>
                                <a>
                                    Edit Post
                                </a>
                            </Link>
                        </div>
                    )}
                    {post.coverImage && (
                        <img src={post.coverImage} className={coverImageStyle}/>
                    )}
                    <h1>{post.title}</h1>
                    <div className={contentContainer}>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post;