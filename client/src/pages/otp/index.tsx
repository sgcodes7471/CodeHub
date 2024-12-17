import { useEffect, useState, ChangeEvent } from "react";

export default function OtpInput() {
  const [issue, setIssue] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIssue(null);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [issue]);

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.includes("")) {
      setIssue("Please enter all 4 digits of the OTP.");
      return;
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div
        className="form-wrapper w-[40%]"
        style={{ borderRadius: "14px", padding: "6px" }}
      >
        <div
          className="p-10"
          style={{ borderRadius: "8px", background: "#fbfbfb" }}
        >
          <form  onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-6">
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input key={index} id={`otp-${index}`} type="text" value={digit} maxLength={1}
                 onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e.target.value)}
                 className="w-12 h-12 text-center border-2 border-blue-500 rounded-lg text-xl"/>
              ))}
            </div>
            <input type="submit" value="Submit OTP"  style={{ fontSize: "1.1rem", background: "rgb(58, 58, 255)" }}
             className="w-[10vw] py-2 text-white cursor-pointer font-semibold rounded"/>
          </form>
          <div className="text-red-500 text-left mt-2 h-[20px] font-semibold">
            {issue}
          </div>
        </div>
      </div>
    </div>
  );
}
