export default function UserProfile({params}: any) {
    return (
        <div className="mx-auto text-center min-h-screen  flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold">Profile ID:</h1>
                <h2 className="text-2xl bg-purple-600">{params.id}</h2>
            </div>
        </div>
    )
}