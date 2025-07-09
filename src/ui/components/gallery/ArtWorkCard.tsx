import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IArtWork } from "@/constant/data";
import { Heart, MessageCircle, Play, Send } from "lucide-react";
import Image from "next/image";

interface IArtWorkCardProps {
  artwork: IArtWork;
  onVote: (artworkId: number) => void;
  newComments: Record<number, string>;
  setNewComments: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  handleAddComment: (artworkId: number) => void;
}
export const ArtWorkCard = ({
  artwork,
  onVote,
  newComments,
  setNewComments,
  handleAddComment,
}: IArtWorkCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in border-border/50 w-full"
      style={{ animationDelay: `${artwork.id - 1 * 100}ms` }}
    >
      {/* Artist Name and image  */}
      <div className="flex items-center justify-between px-5">
        {/* Name And Image Of User */}
        <div className="flex items-center gap-2">
          {/* User Image */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{artwork.artist.slice(0, 2)}</AvatarFallback>
          </Avatar>
          {/* User Name */}
          <div className="flex flex-col">
            <h1 className="font-bold text-sm">{artwork.artist}</h1>
            <h5 className="font-normal text-xs text-gray-500">
              abanob.shenoda@gmail.com
            </h5>
          </div>
        </div>
        {/* Three dots for more actions */}
        <div></div>
      </div>
      {/* Artwork Image/Video */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          layout="fill"
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {artwork.isVideo && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90"
            >
              <Play className="h-5 w-5 ml-0.5" />
            </Button>
          </div>
        )}
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-background/90"
        >
          {artwork.category}
        </Badge>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{artwork.title}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{artwork.publishDate}</span>
          {/* Vote Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onVote(artwork.id)}
              className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
            >
              <Heart className="h-4 w-4" />
              Vote ({artwork.votes})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MessageCircle className="h-4 w-4" />
            Comments
          </div>
          {artwork.comments.slice(0, 2).map((comment, idx) => (
            <div
              key={idx}
              className="text-sm bg-muted/50 rounded-lg p-2 flex gap-2 items-start "
            >
              {/* User Image */}
              <Avatar className="mt-px">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{artwork.artist.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-foreground">
                  {comment.user}:
                </span>{" "}
                <span className="text-muted-foreground">{comment.text}</span>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Add Comment */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComments[artwork.id] || ""}
            onChange={(e) =>
              setNewComments((prev) => ({
                ...prev,
                [artwork.id]: e.target.value,
              }))
            }
            className="flex-1 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment(artwork.id);
              }
            }}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleAddComment(artwork.id)}
            disabled={!newComments[artwork.id]?.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
