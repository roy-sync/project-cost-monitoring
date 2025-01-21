import { cookies } from 'next/headers';

export async function GET() {
  // Access cookies
    const cookieStorage = await cookies();
    const authToken = cookieStorage.get('auth_token')?.value;

    console.log("🚀 ~ getUserData ~ cookieStorage:", cookieStorage.getAll());
    console.log("🚀 ~ getUserData ~ authToken:", authToken);

    if (!authToken) {
    return new Response(JSON.stringify({ error: 'No auth token found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
    }

    const userStatusResponse = await fetch(
        `https://syntactics.bitrix24.com/rest/user.admin?auth=${authToken}`
    );

    const res = await fetch('https://syntactics.bitrix24.com/rest/23/hjhyulmvf8hgaock/department.get');

    const { result } = await res.json();
    const designDivision = result.filter((item:any) => item.PARENT === '13');
    const marketingDivision = result.filter((item:any) => item.PARENT === '15');
    const divisions = designDivision.concat(marketingDivision);
    
    
    const userDataResponse = await fetch(
        `https://syntactics.bitrix24.com/rest/user.current?auth=${authToken}`
    );

    const { result:isAdmin } = await userStatusResponse.json();
    const { result:data } = await userDataResponse.json();

    const updatedData = { ...data, isAdmin };
    const departmentId = data.UF_DEPARTMENT[0];

    let division;

    if (designDivision.some((item:any) => item.ID == departmentId)) {
        division = 'Design and Development';
    } else if (marketingDivision.some((item:any) => item.ID == departmentId)) {
        division = 'Online Marketing';
    }

    const department = divisions.filter((division:any) => division.ID == departmentId);
    const departmentInfo = {id: departmentId, name: department[0].NAME, division: division};

    return new Response(JSON.stringify({ data: updatedData, department: departmentInfo  }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
