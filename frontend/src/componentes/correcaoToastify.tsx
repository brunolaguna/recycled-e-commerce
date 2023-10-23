import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import { getError } from "../utilidades";

export default function correcaoToastify(err : ApiError) 
{
    const apply = document.querySelector('.Toastify')?.childElementCount! > 0
     ? null
     : toast.error(getError(err as ApiError), {autoClose: 1400})

    return apply
}