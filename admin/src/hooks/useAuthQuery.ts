import { apiUrl } from "@/lib/url";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";

const loginUser = async (data: TLogin) => {
  const res = await axios.post(`${apiUrl}/api/user/login`, {
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export const useLoginUserQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast({
        title: `Logged In successfully`,
        variant: "success",
      });
      Cookies.set("token", data.token);
      console.log(data);
      router.push("/");
    },
    onError: (error: any) => {
      toast({
        title: `${error.response.data.message}`,
        variant: "error",
      });
    },
  });
};
