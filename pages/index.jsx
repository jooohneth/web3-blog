import { css } from '@emotion/css';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Link from 'next/link';
import { AccountContext } from '../context';
import { contractAddress, ownerAddress } from '../config';
import Blog from "../artifacts/contracts/Blog.sol/Blog.json";

export default function Home(props){
  const {posts} = props;
  const account = useContext(AccountContext);
  const router = useRouter();

  async function navigate(){
    router.push("/create-post");
  }

  return (
    <div>
      <div className={postList}>
        {posts.map((post,index) => {
          <Link href={`/post/${post[2]}`} >
            <a>
              <div className={linkStyle}>
                <p className={postTitle}>{post[1]}</p>
                <div className={arrowContainer}>
                  <img className={smallArrow} src="/right-arrow.svg" alt="Right arrow" />
                </div>
              </div>
            </a>
          </Link>
        })}
      </div>
      <div className={container}>
        {(account === ownerAddress) && posts && !posts.length && (
          <button className={buttonStyle}>
            Create your first post
            <img src="/right-arrow.svg" alt="Right Arrow" className={arrow} />
          </button>
        )}
      </div>
    </div>
  )
} 

