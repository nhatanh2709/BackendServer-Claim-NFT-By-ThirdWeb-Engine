import { Agent } from "https";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch';
const BACKEND_WALLET_ADDRESS="0xB3701D5D1fCa73263c6C5B1328E248A6d1Ce2AAF"
const NFT_CONTRACT_ADDRESS="0x3E0133C6ACec3e3dCb8F3b282a30d9D1539163A8"
const ENGINE_URL="https://localhost:3005"
const THIRDWEB_SECRET_KEY="Kuv62AUMupewEjOzlDe1zqOe0QmlI_MRbE9HNXgyAWN_W1UQo77TwqpYyowlo5q2P_1cKukst3jxLArttG2X8Q"

const agent = new Agent({
    rejectUnauthorized: false
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(
            !BACKEND_WALLET_ADDRESS ||
            !NFT_CONTRACT_ADDRESS|| 
            !ENGINE_URL||
            !THIRDWEB_SECRET_KEY
        ) {
            res.status(500).json({message: 'Missing enviroment varibles'})
        }

        const { userAddress } = await req.body;
       
        const respone = await fetch(
            `${ENGINE_URL}/contract/binance-testnet/${NFT_CONTRACT_ADDRESS}/erc1155/claim-to`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${THIRDWEB_SECRET_KEY}`,
                    "x-backend-wallet-address": BACKEND_WALLET_ADDRESS || ''
                },
                body: JSON.stringify({
                    receiver: userAddress,
                    tokenId: "0",
                    quantity: "1",
                }),
                agent : agent,
            }
        )
        console.log(respone)
        return res.status(200).json({ message: respone })
    } catch (error :any) {
        return res.status(500).json({ message: error.message });
    }
}