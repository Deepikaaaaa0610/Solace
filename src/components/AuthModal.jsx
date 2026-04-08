import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Mail, Phone, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const STEPS = { METHOD: 0, DETAILS: 1, OTP: 2, SUCCESS: 3 };
const OTP_LENGTH = 6;
const DEMO_OTP = '123456';

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login } = useAuth();
  const [step, setStep] = useState(STEPS.METHOD);
  const [method, setMethod] = useState(null); // 'email' or 'phone'
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const otpRefs = useRef([]);
  const modalRef = useRef(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (showAuthModal) {
      setStep(STEPS.METHOD);
      setMethod(null);
      setName('');
      setContact('');
      setOtp(Array(OTP_LENGTH).fill(''));
      setOtpError('');
      setIsVerifying(false);
    }
  }, [showAuthModal]);

  // Focus first OTP input when reaching OTP step
  useEffect(() => {
    if (step === STEPS.OTP && otpRefs.current[0]) {
      setTimeout(() => otpRefs.current[0]?.focus(), 300);
    }
  }, [step]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showAuthModal) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAuthModal, closeAuthModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showAuthModal]);

  const handleMethodSelect = (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(STEPS.DETAILS);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setStep(STEPS.OTP);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((digit, i) => { newOtp[i] = digit; });
    setOtp(newOtp);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = useCallback(() => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < OTP_LENGTH) {
      setOtpError('Please enter the full verification code');
      return;
    }

    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      if (enteredOtp === DEMO_OTP) {
        login({
          name: name.trim(),
          contact: contact.trim(),
          contactType: method,
        });
        setStep(STEPS.SUCCESS);

        // Auto-close after success
        setTimeout(() => {
          closeAuthModal();
        }, 1500);
      } else {
        setOtpError('Invalid code. Try: 123456');
        setOtp(Array(OTP_LENGTH).fill(''));
        otpRefs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 800);
  }, [otp, name, contact, method, login, closeAuthModal]);

  // Auto-verify when all digits entered
  useEffect(() => {
    if (step === STEPS.OTP && otp.every((d) => d !== '') && !isVerifying) {
      handleVerifyOtp();
    }
  }, [otp, step, isVerifying, handleVerifyOtp]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAuthModal();
    }
  };

  const goBack = () => {
    if (step === STEPS.DETAILS) {
      setStep(STEPS.METHOD);
      setMethod(null);
    } else if (step === STEPS.OTP) {
      setStep(STEPS.DETAILS);
      setOtp(Array(OTP_LENGTH).fill(''));
      setOtpError('');
    }
  };

  if (!showAuthModal) return null;

  const maskedContact = method === 'email'
    ? contact.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : contact.replace(/(\d{2})\d+(\d{2})/, '$1****$2');

  return (
    <div className="auth-backdrop" onClick={handleBackdropClick}>
      <div className={`auth-modal auth-step-${step}`} ref={modalRef}>
        {/* Close button */}
        <button className="auth-close" onClick={closeAuthModal} aria-label="Close">
          <X size={20} />
        </button>

        {/* Back button */}
        {(step === STEPS.DETAILS || step === STEPS.OTP) && (
          <button className="auth-back" onClick={goBack} aria-label="Go back">
            <ArrowLeft size={18} />
          </button>
        )}

        {/* Step: Choose Method */}
        {step === STEPS.METHOD && (
          <div className="auth-step-content animate-fade-in">
            <div className="auth-header">
              <div className="auth-logo">solace</div>
              <h2>Welcome to Solace</h2>
              <p>Sign in to save your poems, access your notebook, and join the community</p>
            </div>

            <div className="auth-methods">
              <button
                className="auth-method-btn"
                onClick={() => handleMethodSelect('email')}
              >
                <div className="auth-method-icon">
                  <Mail size={22} />
                </div>
                <div className="auth-method-text">
                  <strong>Continue with Email</strong>
                  <span>{"We'll send a verification code"}</span>
                </div>
              </button>

              <button
                className="auth-method-btn"
                onClick={() => handleMethodSelect('phone')}
              >
                <div className="auth-method-icon">
                  <Phone size={22} />
                </div>
                <div className="auth-method-text">
                  <strong>Continue with Phone</strong>
                  <span>{"We'll send an SMS code"}</span>
                </div>
              </button>
            </div>

            <p className="auth-terms">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* Step: Enter Details */}
        {step === STEPS.DETAILS && (
          <div className="auth-step-content animate-fade-in">
            <div className="auth-header">
              <div className="auth-icon-circle">
                {method === 'email' ? <Mail size={24} /> : <Phone size={24} />}
              </div>
              <h2>Enter your details</h2>
              <p>
                {method === 'email'
                  ? "We'll send a verification code to your email"
                  : "We'll send a verification code via SMS"}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleDetailsSubmit}>
              <div className="auth-field">
                <label htmlFor="auth-name">Your Name</label>
                <input
                  id="auth-name"
                  type="text"
                  placeholder="e.g. Mirza Ghalib"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-contact">
                  {method === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <input
                  id="auth-contact"
                  type={method === 'email' ? 'email' : 'tel'}
                  placeholder={method === 'email' ? 'ghalib@solace.com' : '+91 98765 43210'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  autoComplete={method === 'email' ? 'email' : 'tel'}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={!name.trim() || !contact.trim()}>
                Send Verification Code
              </button>
            </form>
          </div>
        )}

        {/* Step: OTP Verification */}
        {step === STEPS.OTP && (
          <div className="auth-step-content animate-fade-in">
            <div className="auth-header">
              <div className="auth-icon-circle">
                <ShieldCheck size={24} />
              </div>
              <h2>Verify your {method === 'email' ? 'email' : 'phone'}</h2>
              <p>Enter the 6-digit code sent to <strong>{maskedContact}</strong></p>
            </div>

            <div className="auth-otp-container">
              <div className="auth-otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className={`auth-otp-input ${otpError ? 'error' : ''} ${digit ? 'filled' : ''}`}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>

              {otpError && <p className="auth-otp-error">{otpError}</p>}

              {isVerifying && (
                <div className="auth-verifying">
                  <div className="auth-spinner" />
                  <span>Verifying...</span>
                </div>
              )}
            </div>

            <div className="auth-otp-hint">
              <p>Demo code: <strong>123456</strong></p>
            </div>

            <button className="auth-resend" onClick={() => {
              setOtp(Array(OTP_LENGTH).fill(''));
              setOtpError('');
              otpRefs.current[0]?.focus();
            }}>
              {"Didn't receive the code? "}<strong>Resend</strong>
            </button>
          </div>
        )}

        {/* Step: Success */}
        {step === STEPS.SUCCESS && (
          <div className="auth-step-content auth-success animate-fade-in">
            <div className="auth-success-icon">
              <CheckCircle size={56} />
            </div>
            <h2>Welcome, {name}!</h2>
            <p>{"You're now signed in to Solace"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
