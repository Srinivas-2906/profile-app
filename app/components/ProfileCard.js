export default function ProfileCard({ profile, onEdit, onDelete }) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        {/* Avatar */}
        <div className="flex items-center mb-4">
          <img
            src={profile.avatar_url || 'https://via.placeholder.com/60'}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-gray-600">{profile.occupation}</p>
          </div>
        </div>
  
        {/* Profile Info */}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {profile.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Age:</span> {profile.age}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {profile.location}
          </p>
        </div>
  
        {/* Bio */}
        {profile.bio && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-3">{profile.bio}</p>
          </div>
        )}
  
        {/* Timestamps */}
        <div className="text-xs text-gray-500 mb-4">
          <p>Created: {formatDate(profile.created_at)}</p>
          {profile.updated_at !== profile.created_at && (
            <p>Updated: {formatDate(profile.updated_at)}</p>
          )}
        </div>
  
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(profile)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(profile.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }