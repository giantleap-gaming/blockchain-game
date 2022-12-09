import { useState } from "react";
import { Wallet } from "ethers";

export const LoginScreen = () => {
  const [cliInput, setCliInput] = useState("");
  const [privateKey, setPrivetKey] = useState("");
  const [showPrivetKeyInput, setShowPrivetKeyInput] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newWalletCreation, setNewWalletCreation] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [playGame, setPlayGame] = useState(false);
  const allKeys = JSON.parse(localStorage.getItem("all-pk") ?? "[]");
  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
        width: "100%",
        color: "white",
        display: "flex",
        padding: "100px",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (playGame) {
            window.location.reload();
            return;
          }
          setPlayGame(false);
          setError("");
          if (showPrivetKeyInput) {
            try {
              const wallet = new Wallet(privateKey);
              const address = wallet.address;
              sessionStorage.setItem("burnerWallet", privateKey);
              if (!allKeys.includes(wallet.privateKey)) {
                const newList = [...allKeys, privateKey];
                localStorage.setItem("all-pk", JSON.stringify(newList));
              }
              setWalletAddress(address);
              setPlayGame(true);
            } catch (e) {
              setError("Invalid Private key please enter valid private key");
            }
            return;
          }
          if (cliInput === "n") {
            setNewWalletCreation(true);
            setLoading(true);
            const wallet = Wallet.createRandom();
            try {
              setWalletAddress(wallet.address);
              setLoading(true);
              const response = await fetch("https://api.paperdao.money/api/drip", {
                method: "POST",
                body: JSON.stringify({ address: wallet.address }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              if (data.status) {
                sessionStorage.setItem("burnerWallet", wallet.privateKey);
                if (!allKeys.includes(wallet.privateKey)) {
                  const newList = [...allKeys, privateKey];
                  localStorage.setItem("all-pk", JSON.stringify(newList));
                }
                setPlayGame(true);
                setLoading(false);
              }
              return;
            } catch (e) {
              console.log(e);
            }
          }
          if (cliInput === "i") {
            setShowPrivetKeyInput(true);
            setCliInput("");
            return;
          }
          if (typeof +cliInput === "number") {
            const getWalletIndex = +cliInput;
            const privateKey = allKeys[getWalletIndex - 1];
            if (privateKey) {
              const wallet = new Wallet(privateKey);
              const address = wallet.address;
              sessionStorage.setItem("burnerWallet", privateKey);
              setWalletAddress(address);
              setPlayGame(true);
            } else {
              setError("Please Enter a valid Input");
            }
            return;
          }
          setCliInput("");
          setError("Please Enter a valid input");
        }}
      >
        <div>
          {playGame ? (
            <div>
              {walletAddress && <p>{walletAddress}</p>}
              <button autoFocus type="submit" style={{ all: "unset", cursor: "pointer", marginTop: "20px" }}>
                Press Enter to Play the game
              </button>
            </div>
          ) : (
            <>
              {showPrivetKeyInput ? (
                <div>
                  <p>Enter Private Key</p>
                  <input
                    autoFocus
                    value={privateKey}
                    style={{
                      background: "#000",
                      fontSize: "21px",
                      outline: "none",
                      color: "#fff",
                      border: "none",
                      width: "100%",
                      marginTop: "10px",
                    }}
                    onChange={(e) => {
                      setPrivetKey(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <>
                  {newWalletCreation ? (
                    <div>
                      <p>Creating New wallet</p>
                      {loading && <p>Please wait</p>}
                    </div>
                  ) : (
                    <div>
                      <p>
                        Login or create an account.
                        <br />
                        To choose an option, type its symbol and press ENTER. Found 0 accounts on this device.
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginTop: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        <p>Existing Account</p>
                        {allKeys.map((pk: string, index: number) => {
                          const wallet = new Wallet(pk);
                          const address = wallet.address;
                          return (
                            <p key={pk}>
                              {index + 1}. {address}
                            </p>
                          );
                        })}
                      </div>
                      <p>
                        (n) Create new account.
                        <br />
                        (i) Import account using private key.
                      </p>
                      <p style={{ marginTop: "20px" }}>Enter your Input</p>
                      <input
                        autoFocus
                        style={{
                          background: "#000",
                          fontSize: "21px",
                          outline: "none",
                          color: "#fff",
                          border: "none",
                          marginTop: "10px",
                        }}
                        value={cliInput}
                        onChange={(e) => {
                          setCliInput(e.target.value);
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </>
          )}
        </div>
      </form>
    </div>
  );
};
