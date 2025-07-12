import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { GetStaticPaths, GetStaticProps } from 'next';

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
    <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <article className="prose prose-lg prose-invert">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    </div>
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
