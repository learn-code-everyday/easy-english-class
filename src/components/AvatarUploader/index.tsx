import { t } from "@lingui/macro";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, IconButton, Box, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";

import { toast } from "@/helpers/toast";
import { mediaService } from "@/services/media/media.repo";
import { User } from "@/services/user/user.model";
import { UserService } from "@/services/user/user.repo";

type Props = {
  user?: User;
  onUploaded?: (url: string) => void;
};

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/heic",
  "image/heif",
];

export default function AvatarUploader({ user, onUploaded }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    let processedFile = file;
    if (
      !allowedTypes.includes(processedFile.type) &&
      !file.name.toLowerCase().endsWith(".heic")
    ) {
      toast.error(t`File type must be JPG, PNG, GIF or HEIC.`);
      return;
    }

    if (
      file.type === "image/heic" ||
      file.type === "image/heif" ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif")
    ) {
      try {
        const heic2any = (await import("heic2any")).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });
        processedFile = new File(
          [convertedBlob as Blob],
          file.name.replace(/\.heic$|\.heif$/i, ".jpg"),
          { type: "image/jpeg" }
        );
      } catch (err: any) {
        toast.error(err?.message || t`Cannot convert HEIC image!`);
        return;
      }
    }

    try {
      setIsUploading(true);
      const result = await mediaService.uploadImage({
        file: processedFile,
        oldAvatarUrl: String(user?.avatar || ""),
      });
      setIsUploading(false);
      if (!result?.url) throw new Error(t`No image url returned!`);

      await UserService.updateProfile({ avatar: result.url });
      toast.success(t`Avatar updated!`);
      onUploaded?.(result.url);
    } catch (err: any) {
      setIsUploading(false);
      toast.error(err?.message || t`Update avatar failed!`);
    }
  }

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Avatar
        src={user?.avatar}
        sx={{ width: 84, height: 84, boxShadow: 2, cursor: "pointer" }}
        onClick={() => fileInputRef.current?.click()}
      />
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: 4,
          bottom: 4,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { bgcolor: "primary.main" },
        }}
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <PhotoCameraIcon fontSize="small" />
      </IconButton>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 84,
            height: 84,
            bgcolor: "rgba(255,255,255,0.7)",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <CircularProgress size={32} />
        </Box>
      )}
    </Box>
  );
}
