interface PageProps {
  params: Promise<{ credentialId: string }>;
}

const CredentialPage = async ({ params }: PageProps) => {
    const { credentialId } = await params;

    return <div>Credential ID: {credentialId}</div>;
};

export default CredentialPage;