import axios from 'axios';

/*
 * This function is directly attached to the editorjs link tool.
 * If you put in a link, it will return the title, description and image of the link
 * A video as well based on the link.
 * */
export async function GetLink(req: Request) {
    console.log('GET request to /api/link');
    // new URL string

    const url = new URL(req.url);
    // Editor JS will pass the href as a query parameter here
    console.log(url);
    const href = url.searchParams.get('url');

    if (!href) {
        return new Response('Invalid href', {status: 400});
    }

    const res = await axios.get(href);

    // Match title according to the video and return it
    const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
    // If there is a title match then return the title, else return an empty string
    const title = titleMatch ? titleMatch[1] : '';

    // Description match
    const descriptionMatch = res.data.match(/<meta name="description" editorContent="(.*?)"/);
    // If there is a description match then return the description, else return an empty string
    const description = descriptionMatch ? descriptionMatch[1] : '';

    // Image match
    const imageMatch = res.data.match(/<meta property="og:image" editorContent="(.*?)"/);
    // If there is an image match then return the image, else return an empty string
    const imageUrl = imageMatch ? imageMatch[1] : '';

    // Return the built data object in the format required by the editor tool
    return new Response(
        JSON.stringify({
            success: 1,
            meta: {
                title,
                description,
                image: {
                    url: imageUrl
                }
            }
        })
    );
}
