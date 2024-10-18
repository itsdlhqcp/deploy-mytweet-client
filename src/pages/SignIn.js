// import React, { useEffect, useState } from 'react';
// import { Button, Col, Container, Grid, Panel, Row } from 'rsuite';
// import TwitterIcon from '@rsuite/icons/legacy/Twitter';

// // Replace with your Twitter OAuth 2.0 Client ID
// // Replace with your Twitter OAuth 2.0 credentials
// const TWITTER_CLIENT_ID = 'MmsxeUVOTGtwQ2pmT0FCc29RMVA6MTpjaQ';  // Provide your actual client ID
// const TWITTER_CLIENT_SECRET = 'R_B-aSeIVJKIHWbhzZi8jpSE9fjvkgDlA5TDQRjBV9r_Uk5uWV';  // Provide your actual client secret
// const CALLBACK_URL = 'https://my-tweet-eight.vercel.app/signin';  // Provide your actual callback URL

// const SignIn = () => {
//   const [accessToken, setAccessToken] = useState(null);

//   // Function to redirect user to Twitter's OAuth 2.0 authentication page
//   const signInWithProvider = () => {
//     const oauthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&scope=tweet.read%20users.read&state=state123`;
//     window.location.href = oauthUrl;
//   };

//   // Function to handle login click
//   const onXLogin = () => {
//     signInWithProvider();
//   };

//   // Function to exchange authorization code for access token
//   const exchangeCodeForToken = async (authorizationCode) => {
//     const tokenUrl = 'https://api.twitter.com/2/oauth2/token';

//     const body = new URLSearchParams({
//       code: authorizationCode,
//       grant_type: 'authorization_code',
//       client_id: TWITTER_CLIENT_ID,
//       client_secret: TWITTER_CLIENT_SECRET,
//       redirect_uri: CALLBACK_URL,
//     });

//     try {
//       const response = await fetch(tokenUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: body.toString(),
//       });

//       const data = await response.json();

//       if (data.access_token) {
//         // Store the access token in localStorage
//         localStorage.setItem('twitter_access_token', data.access_token);
//         setAccessToken(data.access_token);
//         console.log('Access Token:', data.access_token);
//       } else {
//         console.error('Error exchanging code for token:', data);
//       }
//     } catch (error) {
//       console.error('Failed to exchange authorization code:', error);
//     }
//   };

//   // Check if Twitter redirected back with an authorization code
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authorizationCode = urlParams.get('code');
//     const state = urlParams.get('state');

//     if (authorizationCode && state === 'state123') {
//       // Exchange the authorization code for an access token
//       exchangeCodeForToken(authorizationCode);
//     }
//   }, []);

//   return (
//     <Container>
//       <Grid className="mt-page">
//         <Row>
//           <Col xs={24} md={12} mdOffset={6}>
//             <Panel>
//               <div className="text-center mb-3">
//                 <h2>Welcome to MyTweet</h2>
//                 <p>Let's have fun with Personal Twitter</p>
//               </div>

//               <div className="mt-3">
//                 <Button
//                   block
//                   style={{ backgroundColor: '#1DA1F2', color: 'black', fontWeight: 'bold' }}
//                   onClick={onXLogin}
//                 >
//                   Sign In with Twitter
//                 </Button>
//               </div>

//               {accessToken && (
//                 <div className="text-center mt-3">
//                   <p>You are logged in with Twitter! Access Token is stored in LocalStorage.</p>
//                 </div>
//               )}

//               <div className="text-center mt-3">
//                 <TwitterIcon style={{ fontSize: '2rem', color: '#1DA1F2' }} />
//               </div>
//             </Panel>
//           </Col>
//         </Row>
//       </Grid>
//     </Container>
//   );
// };

// export default SignIn;


import React, { useEffect, useState } from 'react'; 
import { Button, Col, Container, Grid, Panel, Row } from 'rsuite';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';

// Helper to construct Twitter OAuth URL
const REACT_APP_TWITTER_CLIENT_ID='MmsxeUVOTGtwQ2pmT0FCc29RMVA6MTpjaQ'
const TWITTER_STATE = "twitter-increaser-state";
const TWITTER_CODE_CHALLENGE = "challenge";
const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");
const CALLBACK_URL = 'https://my-tweet-eight.vercel.app/signin'; // Set this to your actual callback URL

const getTwitterOAuthUrl = (redirectUri) =>
  getURLWithQueryParams(TWITTER_AUTH_URL, {
    response_type: "code",
    client_id: REACT_APP_TWITTER_CLIENT_ID, // Make sure this is set in your .env file
    redirect_uri: redirectUri,
    scope: TWITTER_SCOPE,
    state: TWITTER_STATE,
    code_challenge: TWITTER_CODE_CHALLENGE,
    code_challenge_method: "plain",
  });

const getURLWithQueryParams = (baseUrl, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `${baseUrl}?${query}`;
};

const SignIn = () => {
  const [accessToken, setAccessToken] = useState(null);

  // Function to redirect user to Twitter's OAuth 2.0 authentication page
  const signInWithProvider = () => {
    const oauthUrl = getTwitterOAuthUrl(CALLBACK_URL);
    window.location.href = oauthUrl;
  };

  // Function to handle login click
  const onXLogin = () => {
    signInWithProvider();
  };

  // Function to exchange authorization code for access token

  // const exchangeCodeForToken = async (authorizationCode) => {
  //   const tokenUrl = 'https://api.twitter.com/2/oauth2/token';

  //   const body = new URLSearchParams({
  //     code: authorizationCode,
  //     grant_type: 'authorization_code',
  //     client_id: REACT_APP_TWITTER_CLIENT_ID,
  //     client_secret: REACT_APP_TWITTER_CLIENT_SECRET,
  //     redirect_uri: CALLBACK_URL,
  //     code_verifier: TWITTER_CODE_CHALLENGE, 
  //   });

  //   try {
  //     const response = await fetch(tokenUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: body.toString(),
  //     });

  //     const data = await response.json();
  //     console.log('Response Data:', data);
  //     if (data.access_token) {
  //       // Store the access token in localStorage
  //       localStorage.setItem('twitter_access_token', data.access_token);
  //       setAccessToken(data.access_token);
  //       console.log('Access Token:', data.access_token);
  //     } else {
  //       console.error('Error exchanging code for token:', data);
  //     }
  //   } catch (error) {
  //     console.error('Failed to exchange authorization code:', error);
  //   }
  // };
  
  const exchangeCodeForToken = async (authorizationCode) => {
    try {
      const response = await fetch('http://localhost:5000/api/twitter/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authorizationCode }), // Send the authorization code to your backend
      });
  
      const data = await response.json(); // Get the token data from the backend
  
      if (data.access_token) {
        localStorage.setItem('twitter_access_token', data.access_token);
        setAccessToken(data.access_token);
        console.log('Access Token:', data.access_token);
      } else {
        console.error('Error exchanging code for token:', data);
      }
    } catch (error) {
      console.error('Failed to exchange authorization code:', error);
    }
  };

  // Check if Twitter redirected back with an authorization code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    const state = urlParams.get('state');

    if (authorizationCode && state === TWITTER_STATE) {
      // Exchange the authorization code for an access token
      exchangeCodeForToken(authorizationCode);
      console.log('auth success');
      
    }
  }, []);

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center mb-3">
                <h2>Welcome to MyTweet</h2>
                <p>Let's have fun with Personal Twitter</p>
              </div>

              <div className="mt-3">
                <Button
                  block
                  style={{ backgroundColor: '#1DA1F2', color: 'black', fontWeight: 'bold' }}
                  onClick={onXLogin}
                >
                  Sign In with Twitter
                </Button>
              </div>

              {accessToken && (
                <div className="text-center mt-3">
                  <p>You are logged in with Twitter! Access Token is stored in LocalStorage.</p>
                </div>
              )}

              <div className="text-center mt-3">
                <TwitterIcon style={{ fontSize: '2rem', color: '#1DA1F2' }} />
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;












