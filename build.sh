#!/usr/bin/env bash

# Frontend-only build script for reflectcal

# Use JDK 8
export JAVA_HOME=$(ls -1d /Library/Java/JavaVirtualMachines/jdk1.8*/Contents/Home | sort -V | tail -n 1)
export PATH=$JAVA_HOME/bin:$PATH
java -version

echo "Installing dependencies..."
npm install

echo "Building frontend..."
if node build.js --dev; then
    echo "Frontend build complete!"
    echo "Output available in: build/"
else
    echo "Build failed! Please check the errors above."
    exit 1
fi
