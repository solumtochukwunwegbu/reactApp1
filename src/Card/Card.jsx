import React from 'react';
import './Card.css';

function Card(params) {
  return(
      <div className='container'>
        <div className='card'>
        <img src="https://th.bing.com/th/id/OIP.NWa23EB5gvquBIjIQKYKVQHaEE?rs=1&pid=ImgDetMain" alt="" />
        <a>Coding</a>
        <p>Turn coffee into code. Learn to build, break, and debug without crying (much).</p>
        </div>
        <div className='card'>
        <img src="https://th.bing.com/th/id/R.9e7c2572eeb176bc43deb184ca845046?rik=uVkPS9IKl0KUMQ&pid=ImgRaw&r=0" alt="" />
        <a>Economics</a>
        <p>Why is everything so expensive? Let’s decode the world with supply, demand, and sass.</p>
        </div>
        <div className='card'>
        <img src="https://digitaldefynd.com/wp-content/uploads/2020/02/Best-mechanical-engineering-course-tutorial-class-certification-training-online-scaled.jpg" alt="" />
        <a>Mechanics</a>
        <p>Things move, things break—we explain why, and how to fix them without duct tape. Mostly.</p>
        </div>
        
      </div>
  );
}

export default Card;