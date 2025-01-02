export default async function POST(request: Request) {
    try {
        const { message } = await request.json();
        console.log("API Route - Received message:", message);

        return Response.json({ 
            message: `Echo: ${message}`
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 