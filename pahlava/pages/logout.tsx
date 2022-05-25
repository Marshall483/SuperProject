import { useRouter } from "next/router";
import { useEffect } from "react";
import { cleanStorage } from "../api/cookieStorage";
import { DashboardLayout } from "../components/layouts/DashboardLayout";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(cleanStorage, 0);
    router.push("/");
  }, [router]);

  return (
    <DashboardLayout title="pahlava | logout">
      <></>
    </DashboardLayout>
  );
};

export default Logout;
