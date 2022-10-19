import * as path from 'path';
import * as fs from 'fs';

function getImageUrl(image_name: string): string | null{
    if (image_name === null) return null
    const dir = path.resolve(__dirname,'..', 'static', 'images', image_name);
    return dir;
    
}

export async function getImageBuffer(image_name: string | null): Promise<Buffer | null> {
    const dir = getImageUrl(image_name);
    const isExist = isImageExist(dir);
    if (isExist) {
        const image_buffer = await fs.readFileSync(dir);
        return image_buffer;
    }
    return null;
}

export async function isImageExist(image_name: string | null): Promise<boolean> {
    try {
        const dir = getImageUrl(image_name);
        if (!dir) return false;
        const isExist = await fs.existsSync(dir);
        return isExist;
    } catch(e) {
        throw new Error(e)
    }
    
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