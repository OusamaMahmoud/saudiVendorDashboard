import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { useDropzone } from "react-dropzone";
import "react-image-gallery/styles/css/image-gallery.css";
// Default image to display initially
const defaultImage = {
    original: "https://via.placeholder.com/600x400?text=Default+Image",
    thumbnail: "https://via.placeholder.com/150x150?text=Default+Thumbnail",
};

const ProductGallery = () => {
    // Initialize the images state with a default image
    const [images, setImages] = useState([defaultImage]);

    // Handle file upload using react-dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        onDrop: (acceptedFiles) => {
            // Convert uploaded files to the format required by react-image-gallery
            const newImages = acceptedFiles.map((file) => ({
                original: URL.createObjectURL(file),
                thumbnail: URL.createObjectURL(file),
            }));

            // Add the new images to the existing gallery
            setImages((prevImages) => [...prevImages, ...newImages]);
        },
    });

    // Filter out invalid images (e.g., those with empty URLs)
    const validImages = images.filter((image) => image.original && image.thumbnail);

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            {/* Image Gallery */}
            {validImages.length > 0 ? (
                <ImageGallery
                    items={validImages}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    thumbnailPosition="bottom"
                    showNav={true}
                    startIndex={0} // Ensure the gallery starts at the first image
                />
            ) : (
                <p>No images to display</p>
            )}

            {/* Dropzone for uploading new images */}
            <div
                {...getRootProps()}
                style={{
                    marginTop: "10px",
                    padding: "10px",
                    border: "2px dashed #ccc",
                    borderRadius: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <input {...getInputProps()} />
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        fontSize: "24px",
                    }}
                >
                    +
                </div>
                <p>Click or drag to upload a new image</p>
            </div>
        </div>
    );
};

export default ProductGallery;
