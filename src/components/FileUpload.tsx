import { Upload } from 'lucide-react'

interface FileUploadProps {
  onGuideUploaded: () => void
}

export function FileUpload({ onGuideUploaded }: FileUploadProps) {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate file upload
      setTimeout(() => {
        onGuideUploaded()
      }, 500)
    }
  }

  return (
    <div className="h-screen bg-[#fafafa] flex flex-col">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-semibold text-neutral-900 tracking-tight">
              Upload your discussion guide
            </h1>
            <p className="text-lg text-neutral-500 max-w-xl mx-auto">
              Upload your discussion guide to get started with your qualitative
              research analysis
            </p>
          </div>

          {/* Upload Area */}
          <div className="w-full max-w-2xl">
            <label
              htmlFor="guide-upload"
              className="group relative flex flex-col items-center justify-center w-full px-8 py-16 border-2 border-dashed border-neutral-300 rounded-xl bg-white hover:bg-neutral-50 hover:border-blue-400 transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Upload className="w-6 h-6 text-neutral-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-base font-medium text-neutral-900">
                    Click to upload your discussion guide
                  </p>
                  <p className="text-sm text-neutral-500">
                    PDF, DOCX, or TXT up to 10MB
                  </p>
                </div>
              </div>
              <input
                id="guide-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.doc"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Help Text */}
          <div className="text-center space-y-2 mt-8">
            <p className="text-sm text-neutral-600">
              Don't have a discussion guide yet?{' '}
              <button
                onClick={onGuideUploaded}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Continue with a sample guide
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
