import { Router } from 'express';
import { manipulateSvg } from '../utils/svgManipulator'; // Remove .ts extension

const router = Router();
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'SVG Router is healthy' });
});
router.get('/generate-svg', async (req, res) => {
    try {
        const {
            mainTitle,
            subtitle,
            sectionTitle,
            image1,
            image2,
            image3,
            value1,
            value2,
            value3
        } = req.query;

        const svgContent = await manipulateSvg({
            mainTitle: mainTitle as string,
            subtitle: subtitle as string,
            sectionTitle: sectionTitle as string,
            image1: image1 as string,
            image2: image2 as string,
            image3: image3 as string,
            value1: value1 as string,
            value2: value2 as string,
            value3: value3 as string
        });


        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
        res.send(svgContent);
    } catch (error) {
        console.error('Error generating SVG:', error);
        res.status(500).send('Error generating SVG');
    }
});

export default router;