import {toast} from "react-toastify";

export const SuccessNotification = () => {
    return (
        toast.success("Successful operation!", {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    );
};