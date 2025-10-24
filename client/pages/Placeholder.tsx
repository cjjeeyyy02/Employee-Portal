import Layout from "@/components/Layout";

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">This page is coming soon</p>
          <p className="text-sm text-gray-500">
            Continue prompting to fill in this page contents if you want it
          </p>
        </div>
      </div>
    </Layout>
  );
}
