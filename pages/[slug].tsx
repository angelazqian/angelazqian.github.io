import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { GetStaticPaths, GetStaticProps } from 'next';
import ConwayBackground from '../components/conwaybackground';

type ProjectPageProps = {
    content: string;
    data: {
        title: string;
        date?: string;
        [key: string]: unknown;
    };
};

export default function ProjectPage({ content, data }: ProjectPageProps) {
  return (
    <><ConwayBackground/>
    <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-[750px] bg-black z-0" />
    <div className="relative min-h-screen flex justify-center items-start">
        <div className="max-w-3xl mx-auto p-8 absolute top-0 bottom-0 w-[700px] bg-black">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <article className="prose prose-lg prose-invert z-5
                        [&_h1]:text-6xl [&_h1]:underline [&_h1]:decoration-[#880000]
                        [&_*]:mt-0 [&_*]:mb-[5px] [&_h1]:mb-[15px]
                        [&_h1_a]:font-bold [&_h2_a]:font-bold">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
        </div>
    </div></>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('markdown');
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join('markdown', `${params!.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  return {
    props: {
      content: processedContent.toString(),
      data,
    },
  };
};
