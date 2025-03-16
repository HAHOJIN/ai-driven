import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET_NAME = 'images';

// 이미지 URL에서 이미지를 가져와 Supabase Storage에 업로드
export async function uploadImageToStorage(
  imageUrl: string, 
  userId: string
): Promise<{ path: string; url: string }> {
  try {
    // 이미지 데이터 가져오기
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();
    
    // 파일 경로 생성
    const fileId = uuidv4();
    const fileExtension = 'webp';
    const filePath = `${userId}/${fileId}.${fileExtension}`;
    
    // Supabase Storage에 업로드
    const { data, error } = await supabaseAdmin
      .storage
      .from(BUCKET_NAME)
      .upload(filePath, imageBuffer, {
        contentType: 'image/webp',
        upsert: false
      });
    
    if (error) {
      throw new Error(`Storage upload error: ${error.message}`);
    }
    
    // 요구사항에 맞는 형식의 공개 URL 생성
    const publicUrl = `https://kwdjxdbnqoklipedljja.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
    
    return {
      path: filePath,
      url: publicUrl
    };
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
}
