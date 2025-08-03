import React from 'react';
import { Shield, Brain, Globe, Users, Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          About <span className="text-blue-600">CyberShield</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          An advanced AI-powered system designed to detect and prevent cyberbullying across multiple languages, 
          making the internet a safer space for everyone.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          CyberShield aims to create a safer digital environment by providing real-time, multilingual 
          cyberbullying detection. Our system leverages cutting-edge machine learning algorithms to 
          identify harmful content across Tamil, Hindi, and English languages, helping platforms and 
          communities protect their users from online harassment.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Precision Detection</h3>
              <p className="text-gray-600 text-sm">Advanced algorithms with high accuracy rates for minimal false positives</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Zap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
              <p className="text-gray-600 text-sm">Instant processing for immediate protection and response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">AI-Powered</h3>
          <p className="text-gray-600">
            Utilizes advanced machine learning models trained on diverse datasets to accurately 
            identify cyberbullying patterns across different languages and contexts.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <Globe className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Multilingual</h3>
          <p className="text-gray-600">
            Supports Tamil, Hindi, and English languages with specialized models for each, 
            including mixed-language content detection capabilities.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Community Focused</h3>
          <p className="text-gray-600">
            Built with community safety in mind, providing tools for moderators and 
            administrators to maintain healthy online environments.
          </p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning Model</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>TF-IDF vectorization for feature extraction</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Support Vector Machine (SVM) classifier</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Trained on 30,000+ labeled examples</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>95%+ accuracy across all supported languages</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Datasets Used</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>HASOC 2020 multilingual dataset</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>DravidianCodeMix Tamil corpus</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Hindi-English code-mixed data</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Custom curated validation sets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make the Internet Safer?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Start using CyberShield today to detect and prevent cyberbullying in your community. 
          Together, we can build a more inclusive and respectful digital world.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105">
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default About;