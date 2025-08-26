import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // searchParams에서 name과 age 값을 추출
  const name = searchParams.get('name');
  const age = searchParams.get('age');
  
  // 응답 데이터 구성
  const responseData = {
    name: name,
    age: age,
    searchParams: Object.fromEntries(searchParams.entries())
  };
  
  return Response.json(responseData);
}
