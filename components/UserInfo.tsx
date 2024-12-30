interface UserInfoProps {
    email: string | null;
    name?: string;
}

export default function UserInfo({ email, name }: UserInfoProps) {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg">Logged in as: {email}</p>
            <p className="text-lg">Name: {name || 'Loading...'}</p>
        </div>
    );
}