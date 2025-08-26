import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import ConwayBackground from '../../components/conwaybackground';

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
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
          crossOrigin="anonymous"
        />
      </Head>
      <ConwayBackground/>
      <div className="relative min-h-screen flex justify-center items-start">
          <div className="absolute w-[900px] bg-black top-[60px] bottom-[60px] rounded-3xl z-0" />
              <article className="prose prose-lg prose-invert relative z-5 w-[800px]
                          mt-[100px] mb-[100px]
                          [&_h1]:text-6xl [&_h1]:underline [&_h1]:decoration-[#880000]
                          [&_*]:mt-0 [&_*]:mb-[10px] [&_h1]:mb-[20px]
                          [&_h1_a]:font-bold [&_h2_a]:font-bold
                          [&_blockquote]:font-normal [&_blockquote_p]:font-normal
                          [&_p]:leading-tight
                          [&_.katex]:my-0 [&_.katex-html]:my-0 [&_.katex-display]:my-0 [&_span.katex]:my-0
                          [&_img]:mx-auto [&_img]:block [&_img]:mt-[15px] [&_img]:mb-[15px] [&_img]:rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
              </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('markdown/projects');
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
  const filePath = path.join('markdown/projects', `${params!.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const processedContent = await remark()
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);
    
  return {
    props: {
      content: processedContent.toString(),
      data,
    },
  };
};