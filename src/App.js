import {React, useState} from 'react'
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import FbConfig from './FbConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
const App = () => {
  const [myphoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)

  const capcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log('Recaptch resolved')
      }
    }, auth
    );
  }

  const onSignInSubmit = (e) => {
    e.preventDefault();
    capcha();
    const phoneNumber = "+91" + myphoneNumber;
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult); // store confirmationResult in state
          console.log("otp sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("otp not sent")
        });
  }


  const onSubmitOtp = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    if (!confirmationResult) {
      console.log("confirmation result is null");
      return;
    }
    confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("Incorrect OTP");
      });
  } 

  return (
    <div className='main' >
      <div className='card' >
      <h1>Sign up</h1>
      <h3>Phone Number</h3>

      <form onSubmit={onSignInSubmit} >
      <div id="sign-in-button"></div>
      <input type="number" name="mobnum" placeholder="Enter Phone number" onChange={(e)=>setPhoneNumber(e.target.value)} />
      <br/>
      <button className='btn btn-success' >Submit</button>
      </form>

      <h3>Enter OTP</h3>

      <form onSubmit={onSubmitOtp}>
      <input type="number"  name='otp' placeholder="Enter OTP" onChange={(e)=>setOtp(e.target.value)} />
      <br />
      <button className='btn btn-success' >OTP</button>
      </form>
      </div>
    </div>
  )
}

export default App;
