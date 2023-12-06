import Image from 'next/image';

import classNames from 'classnames';

import classes from './page.module.scss';

type DocItemProps = {
  title: string;
  description: string;
  href: string;
};
export default function Home() {
  return (
    <main className={classes['main']}>
      <div className={classes['container']}>
        <p className={classes['text']}>
          Get started by editing&nbsp;
          <code className={classes['code']}>app/page.tsx</code>
        </p>
        <div className={classes['link-container']}>
          <a
            className={classes['link']}
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src="/vercel.svg" alt="Vercel Logo" className={classes['image']} width={100} height={24} priority />
          </a>
        </div>
      </div>

      {/* transform code using scss */}

      <div className={classes['centre-image']}>
        <Image className={classes['image']} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
      </div>
      {Docs()}
    </main>
  );
}

function Docs() {
  return (
    <div className={classes['docs']}>
      <DocItem title="Sample page" description="table with React-query." href="/dashboard" />
      <DocItem title="Documentation" description="Find in-depth information about Next.js features and API." href="https://nextjs.org/docs" />
      <DocItem title="Learn" description="Learn about Next.js in an interactive course with quizzes!" href="https://nextjs.org/learn" />
      <DocItem title="Examples" description="Discover and deploy boilerplate example Next.js projects." href="" />
    </div>
  );
}

function DocItem({ title, description, href }: DocItemProps): JSX.Element {
  return (
    <a href={href} className={classNames('group', classes['doc'])} target="_blank" rel="noopener noreferrer">
      <h2 className={classes['title']}>
        {title} <span className={classes['transform-icon']}>-&gt;</span>
      </h2>
      <p className={classes['description']}>{description}</p>
    </a>
  );
}
