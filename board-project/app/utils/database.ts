import { MongoClient } from "mongodb";

declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

const url = process.env.MONGODB_URL;

if (!url) {
  throw new Error('MONGODB_URL 환경변수가 없습니다.');
}
else {
    console.log(url);
}

let connectDB: Promise<MongoClient>;

try {
    if(process.env.NODE_ENV === 'development') {
        if(!global._mongo) {
            global._mongo = new MongoClient(url).connect();
        }
        connectDB = global._mongo;
    } else {
        connectDB = new MongoClient(url).connect();
    }
} catch (error) {
    console.error(error);
    // 에러 발생 시 기본값 설정
    connectDB = Promise.reject(error);
}

export default connectDB;