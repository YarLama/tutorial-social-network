import * as path from 'path';
import * as fs from 'fs';

function getImageUrl(image_name: string): string {
    const dir = path.resolve(__dirname,'..', 'static', 'images', image_name);
    return dir;
}

export async function getImageBuffer(image_name: string): Promise<Buffer | null> {
    try {
        const dir = getImageUrl(image_name);
        const isExist = isImageExist(dir);
        if (isExist) {
            const image_buffer = await fs.readFileSync(dir);
            return image_buffer;
        }
        throw new Error('not found')
    } catch(e) {
        return null;
    }
    
}

export async function isImageExist(image_name: string): Promise<boolean> {
    const dir = getImageUrl(image_name);
    const isExist = await fs.existsSync(dir);
    return isExist;
}

export async function removeLocalImage(image_name: string): Promise<boolean> {
    try {
        const dir = getImageUrl(image_name);
        const isExist = isImageExist(dir);
        if (isExist) {
            const remove = await fs.unlinkSync(dir);
            return true;
        }
        throw new Error('not found')
    } catch(e) {
        return false;
    }
}