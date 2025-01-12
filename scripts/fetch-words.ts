import fs from 'fs';
import path from 'path';

async function createWordList() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const filePath = path.join(process.cwd(), 'data', 'turkish-words.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const words = fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(word =>
        word.length > 1 &&
        /^[a-zçğıöşüA-ZÇĞİÖŞÜ]+$/i.test(word) &&
        !word.includes(' ')
      )
      .map(word => word.toLowerCase())
      .sort();

    const uniqueWords = [...new Set(words)];

    fs.writeFileSync(
      path.join(dataDir, 'turkish-words.json'),
      JSON.stringify(uniqueWords, null, 2)
    );

    console.log(`${uniqueWords.length} kelime başarıyla kaydedildi.`);

    console.log('\nKelime İstatistikleri:');
    console.log('-------------------');
    console.log(`Toplam Kelime: ${uniqueWords.length}`);
    console.log(`En Kısa Kelime Uzunluğu: ${Math.min(...uniqueWords.map(w => w.length))}`);
    console.log(`En Uzun Kelime Uzunluğu: ${Math.max(...uniqueWords.map(w => w.length))}`);
    console.log(`En Uzun Kelime: ${uniqueWords.reduce((a, b) => a.length > b.length ? a : b)}`);

  } catch (error) {
    console.error('Hata:', error);
  }
}

createWordList().catch(console.error);