import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      //    const data = await createLinkToken(user)
    };
    getLinkToken;
  }, []);
  const onSuccess = useCallback(async () => {}, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary">Connect Bank</Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
