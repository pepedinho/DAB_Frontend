import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    // Vérifiez si le code est défini
    if (!code) {
        return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    try {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID as string,
                client_secret: process.env.DISCORD_CLIENT_SECRET as string,
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: process.env.REDIRECT_URI as string,
            }),
        });

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 500 });
        }

        const { access_token } = await tokenResponse.json();

        // const guildResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        //     headers: {
        //         Authorization: `Bearer ${access_token}`,
        //     },
        // });

        // const guilds = await guildResponse.json();

        // Redirection vers le dashboard avec les guildes
        const response = NextResponse.redirect(new URL(`/dashboard?token=${access_token}`, req.url));
        response.cookies.set('isLoggedIn', 'true', { httpOnly: true, sameSite: 'lax' ,maxAge: 60 * 60 });
        return response
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred : ' + error }, { status: 500 });
    }
}