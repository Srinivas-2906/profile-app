export default function ProfileCard({ profile, onEdit, onDelete }) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 transform hover:-translate-y-1">
        {/* Avatar */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={profile.avatar_url || 'https://via.placeholder.com/60'}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-5">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h3>
            <p className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full text-sm inline-block">{profile.occupation}</p>
          </div>
        </div>
  
        {/* Profile Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <span className="w-20 text-sm font-semibold text-gray-500 uppercase tracking-wide">Email:</span>
            <span className="text-gray-800 font-medium">{profile.email}</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm font-semibold text-gray-500 uppercase tracking-wide">Age:</span>
            <span className="text-gray-800 font-medium">{profile.age}</span>
          </div>
          <div className="flex items-center">
            <span className="w-20 text-sm font-semibold text-gray-500 uppercase tracking-wide">Location:</span>
            <span className="text-gray-800 font-medium">{profile.location}</span>
          </div>
        </div>
  
        {/* Bio */}
        {profile.bio && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">About</h4>
            <p className="text-gray-700 leading-relaxed line-clamp-3 bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500">{profile.bio}</p>
          </div>
        )}
  
        {/* Timestamps */}
        <div className="text-xs text-gray-400 mb-6 bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between">
            <span>Created: {formatDate(profile.created_at)}</span>
            {profile.updated_at !== profile.created_at && (
              <span>Updated: {formatDate(profile.updated_at)}</span>
            )}
          </div>
        </div>
  
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(profile)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={() => onDelete(profile.id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }