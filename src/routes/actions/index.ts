import { Router, Request, Response } from 'express';
import {
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    ActionError,
    MEMO_PROGRAM_ID,
} from "@solana/actions";
import { 
    Transaction, 
    PublicKey, 
    Connection,
    clusterApiUrl
} from '@solana/web3.js';

const router = Router();

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

router.get('/', (_: Request, res: Response) => {
    const payload: ActionGetResponse = {
        description: 'This is the actions endpoint for the Testing Blinks Action Chainings',
        icon: 'https://www.quick-blinks.xyz/events.png',
        label: 'Action Chainings',
        title: 'Testing Blinks Action Chainings',
        links: {
            actions: [
                {
                    href: '/actions?page=1',
                    label: 'Next Page',
                },
            ],
        },
    };

    res.json(payload);
});

router.post('/', async (req: Request, res: Response) => {
    const { page } = req.query;

    const body: ActionPostRequest = req.body;
    const { account } = body;

    const authority = new PublicKey(account);

    // Calculate the next page
    const nextPage = page ? parseInt(page as string, 10) + 1 : 1;

    // Calculate previous page if not on the first page
    const prevPage = page && parseInt(page as string, 10) > 1 ? parseInt(page as string, 10) - 1 : 1;

    const memoMessage = "Hello, Solana Memo Program!";

    const tx = new Transaction().add({
        // Step 5: Add a Memo instruction
        keys: [],
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from(memoMessage, 'utf8'), // The message to be signed
    });
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = authority;

    const payload = await createPostResponse({
        fields: {
          links: {
            next: {
                type: 'inline',
                action: {
                    description: `Action ${page}`,
                    icon: `https://www.quick-blinks.xyz/events.png`,
                    label: `Action ${page} Label`,
                    title: `Action ${page}`,
                    type: "action",
                    links: {
                        actions: [
                            {
                                href: `/actions?page=${prevPage}`,
                                label: 'Previous Page',
                            },
                            {
                                href: `/actions?page=${nextPage}`,
                                label: 'Next Page',
                            }
                        ],
                    }
                }
            }
          },
          transaction: tx,
          message: "happy chaining",
        },
    });

    res.json(payload);
});

export default router;