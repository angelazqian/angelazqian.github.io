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

export default function ProjectPage({ content }: ProjectPageProps) {
  return (
    <><ConwayBackground/>
    <div className="relative min-h-screen flex justify-center items-start">
        <div className="absolute w-[700px] bg-black top-[60px] bottom-[60px] rounded-3xl z-0" />
            <article className="prose prose-lg prose-invert relative z-5 w-[600px]
                        mt-[100px] mb-[100px]
                        [&_h1]:text-6xl [&_h1]:underline [&_h1]:decoration-[#880000]
                        [&_*]:mt-0 [&_*]:mb-[5px] [&_h1]:mb-[15px]
                        [&_blockquote]:not-italic [&_blockquote_p]:not-italic
                        [&_blockquote]:font-normal [&_blockquote_p]:font-normal
                        [&_h1_a]:font-bold [&_h2_a]:font-bold">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
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
