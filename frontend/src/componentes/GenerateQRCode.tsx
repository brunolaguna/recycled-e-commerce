import axios from "axios";

export default async function GenerateQRCode(QRcode: string)
{
    const fetchQRCode = await axios.get("https://public-api.qr-code-generator.com/v1/create/free?image_format=SVG&image_width=500&foreground_color=%23000000&frame_color=%23000000&frame_name=no-frame&qr_code_logo=&qr_code_pattern=&qr_code_text="+QRcode)
    return fetchQRCode
}