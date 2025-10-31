import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
onLogin: (userType: string, userData: any) => void;
}

// ✅ Bypasses real API — local mock login
export default function LoginForm({ onLogin }: LoginFormProps) {
const [formData, setFormData] = useState({
email: "",
password: "",
schoolCode: "",
studentId: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData({
...formData,
[e.target.id]: e.target.value,
});
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setError(null);

    try {
  // Simulate short delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Fake validation
  if (!formData.email || !formData.password || !formData.schoolCode) {
    throw new Error("Please fill all required fields.");
  }

  // ✅ Mock successful login response
  const mockUser = {
    id: "mock123",
    name: "Demo Student",
    ecoPoints: 120,
    token: "mock-token-xyz",
    userType: "student",
    email: formData.email,
  };

  onLogin(mockUser.userType, mockUser);
} catch (err) {
  console.error("Mock login error:", err);
  setError(
    err instanceof Error ? err.message : "Unexpected error during mock login."
  );
} finally {
  setLoading(false);
}
}


 return (
<div className="min-h-screen flex items-center justify-center p-4">
<Card className="w-full max-w-md shadow-nature">
<CardHeader className="text-center">
<div className="text-4xl mb-2">🌱</div>
<CardTitle className="text-2xl bg-gradient-nature bg-clip-text text-transparent">
EcoLearn
</CardTitle>
<p className="text-muted-foreground">Login to your account</p>
</CardHeader>
<CardContent>
<form onSubmit={handleSubmit} className="space-y-4">
{error && (
<div className="p-3 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg">
{error}
</div>
)}

                    <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="schoolCode">School Code (Required)</Label>
          <Input
            id="schoolCode"
            type="text"
            placeholder="Enter your school code"
            value={formData.schoolCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="studentId">Student ID (Optional)</Label>
          <Input
            id="studentId"
            type="text"
            placeholder="Enter your student ID"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Verifying..." : "Login Securely"}
        </Button>
      </form>
    </CardContent>
  </Card>

</div>
);
}
 
