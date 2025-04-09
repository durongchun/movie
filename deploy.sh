#!/bin/bash

# Exit immediately if any command fails
set -e

# Step 0: Clean old build
echo "🧹 Removing old dist folder..."
rm -rf dist

# Step 1: Build the React app
echo "🔧 Building React app..."
npm run build

# Step 2: Sync to S3
echo "🚀 Syncing build to S3..."
aws s3 sync dist/ s3://my-movie-react-app/ --delete

# Step 3: Configure S3 static website hosting
echo "🌐 Configuring S3 website hosting..."
aws s3 website s3://my-movie-react-app/ --index-document index.html --error-document error.html

# Step 4: Set public access
echo "🔓 Updating public access settings..."
aws s3api put-public-access-block --bucket my-movie-react-app \
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

# Step 5: Apply bucket policy
echo "🛡️ Applying bucket policy..."
aws s3api put-bucket-policy --bucket my-movie-react-app --policy file://policy.json

# Final Step: Print site URL
echo "🌍 Your site is live at:"
echo "👉 http://my-movie-react-app.s3-website-us-west-2.amazonaws.com/"
echo "🎉 Deployment complete!"