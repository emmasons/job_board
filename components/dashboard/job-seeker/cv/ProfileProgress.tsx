// shows the progress bar, indicates how complete the user profile is

const ProfileProgress: React.FC= () => {
    return (
        <div className="flex items-center space-x-4">
            <div flex-1 h-2 bg-gray-200 rounded-full>
                <div className="h-full bg-green-500 rounded-full" style={{ width: "18%" }}></div>
            </div>
            <span>10% Profile Complete</span>
        </div>
    );
};

export default ProfileProgress;