import { useState } from "react";
import { DollarSign, Users, Trash2, ExternalLink, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type NGO = {
  id: string;
  name: string;
  description: string;
  link: string;
};

type CategoryType = "donate" | "member" | "cleanup" | null;

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);

  // NGO data for each category - Replace these links with actual NGO URLs
  const ngoData: Record<string, NGO[]> = {
    donate: [
      {
        id: "ngo1",
        name: "Green Earth Foundation",
        description: "Supporting global reforestation and climate action initiatives",
        link: "https://www.givemetrees.org/donate",
      },
      {
        id: "ngo2",
        name: "Ocean Conservation Alliance",
        description: "Protecting marine life and cleaning our oceans",
        link: "https://oceana.org/resources/ways-to-give-donate-now/",
      },
      {
        id: "ngo3",
        name: "Wildlife Protection Fund",
        description: "Preserving endangered species and their habitats",
        link: "https://donation.wti.org.in/?_gl=1%2a8blpl2%2a_ga%2aMTgxNDQwNDE3OS4xNzYwNzk5NzEx%2a_ga_9BPRSS24H5%2aczE3NjA3OTk3MTEkbzEkZzAkdDE3NjA3OTk3MTEkajYwJGwwJGgw",
      },
    ],
    member: [
      {
        id: "ngo4",
        name: "Eco Warriors Community",
        description: "Join a global network of environmental activists",
        link: "https://ecowarrior.co.in/",
      },
      {
        id: "ngo5",
        name: "Sustainable Living Network",
        description: "Learn and practice sustainable lifestyle choices",
        link: "https://www.fee.global/become-a-member",
      },
      {
        id: "ngo6",
        name: "Green Citizens Alliance",
        description: "Community-driven environmental advocacy group",
        link: "https://indiaenvironment.org/volunteer/",
      },
    ],
    cleanup: [
      {
        id: "ngo7",
        name: "Clean Streets Initiative",
        description: "Organizing local neighborhood cleanup events",
        link: "https://www.garbagefreeindia.org/campaigns-and-clean-updrives",
      },
      {
        id: "ngo8",
        name: "Beach Cleanup Brigade",
        description: "Monthly coastal cleanup drives and awareness campaigns",
        link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2167680",
      },
      {
        id: "ngo9",
        name: "Park Rangers Volunteer",
        description: "Maintaining and cleaning public parks and green spaces",
        link: "https://earth5r.org/clean-up-drive-jammu-earth5r/",
      },
    ],
  };

  const collectionOptions = [
    {
      id: "donate",
      title: "Make a Donation",
      description:
        "Support our environmental initiatives and help us create a greener future for everyone.",
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: "Donate Now",
    },
    {
      id: "member",
      title: "Become a Member",
      description:
        "Join our community of eco-warriors and get exclusive access to events, resources, and rewards.",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
      action: "Join Community",
    },
    {
      id: "cleanup",
      title: "Community Cleanup Drive",
      description:
        "Participate in local cleanup events and make a direct impact on your neighborhood's environment.",
      icon: Trash2,
      color: "text-secondary-foreground",
      bgColor: "bg-secondary",
      action: "View Events",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId as CategoryType);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleNGOClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {!selectedCategory ? (
          <>
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold text-foreground">Take Action Today</h1>
              <p className="text-lg text-muted-foreground">
                Choose how you'd like to contribute to a cleaner, greener planet
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {collectionOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card
                    key={option.id}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    onClick={() => handleCategoryClick(option.id)}
                  >
                    <CardHeader>
                      <div
                        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${option.bgColor}`}
                      >
                        <Icon className={`h-8 w-8 ${option.color}`} />
                      </div>
                      <CardTitle className="text-2xl">{option.title}</CardTitle>
                      <CardDescription className="text-base">{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full transition-transform group-hover:translate-y-0.5"
                        variant={
                          option.id === "donate"
                            ? "default"
                            : option.id === "member"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 p-12 text-center shadow-lg transform transition-all hover:scale-105">
  <h2 className="mb-4 text-4xl font-extrabold text-white drop-shadow-lg">
    Together We Can Make a Difference
  </h2>
  <p className="mx-auto max-w-2xl text-lg text-white/90 mb-6">
    Every action counts. Whether you donate, join as a member, or participate in our cleanup drives,
    you're contributing to a sustainable future for our planet.
  </p>
  
</div>

          </>
        ) : (
          <>
            <div className="mb-8">
              <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-foreground">
                  {collectionOptions.find((opt) => opt.id === selectedCategory)?.title}
                </h1>
                <p className="text-lg text-muted-foreground">Select an organization to visit their page</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ngoData[selectedCategory]?.map((ngo) => (
                <Card
                  key={ngo.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => handleNGOClick(ngo.link)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-xl">
                      {ngo.name}
                      <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </CardTitle>
                    <CardDescription className="text-base">{ngo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Collection;
