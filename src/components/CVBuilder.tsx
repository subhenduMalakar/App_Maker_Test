import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Plus, 
  Save, 
  Download, 
  ArrowLeft, 
  Trash2,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
  FileText,
  User,
  BookOpen,
  ChevronRight,
  Settings,
  XCircle
} from 'lucide-react';
import { CV, Experience, Education, Skill, Language, Certificate, Project, Reference } from '@/data/cvData';
import { motion, AnimatePresence } from 'framer-motion';

interface CVBuilderProps {
  cv: CV;
  onSave: (cv: CV) => void;
  onCancel: () => void;
  onExport: (cv: CV, format: string) => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ 
  cv: initialCV, 
  onSave, 
  onCancel,
  onExport 
}) => {
  const [cv, setCV] = useState<CV>(initialCV);
  const [activeTab, setActiveTab] = useState('personal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Close the menu drawer when switching to desktop
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCV({
      ...cv,
      personalInfo: {
        ...cv.personalInfo,
        [name]: value
      }
    });
  };

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      location: '',
      achievements: []
    };
    setCV({
      ...cv,
      experience: [...cv.experience, newExperience]
    });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const updatedExperience = [...cv.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setCV({
      ...cv,
      experience: updatedExperience
    });
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...cv.experience];
    updatedExperience.splice(index, 1);
    setCV({
      ...cv,
      experience: updatedExperience
    });
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
      location: ''
    };
    setCV({
      ...cv,
      education: [...cv.education, newEducation]
    });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...cv.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setCV({
      ...cv,
      education: updatedEducation
    });
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...cv.education];
    updatedEducation.splice(index, 1);
    setCV({
      ...cv,
      education: updatedEducation
    });
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: '',
      level: 3,
      category: ''
    };
    setCV({
      ...cv,
      skills: [...cv.skills, newSkill]
    });
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...cv.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setCV({
      ...cv,
      skills: updatedSkills
    });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...cv.skills];
    updatedSkills.splice(index, 1);
    setCV({
      ...cv,
      skills: updatedSkills
    });
  };

  // Language handlers
  const handleAddLanguage = () => {
    const newLanguage: Language = {
      id: `lang-${Date.now()}`,
      name: '',
      proficiency: 'Limited Working'
    };
    setCV({
      ...cv,
      languages: [...cv.languages, newLanguage]
    });
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: any) => {
    const updatedLanguages = [...cv.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    setCV({
      ...cv,
      languages: updatedLanguages
    });
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...cv.languages];
    updatedLanguages.splice(index, 1);
    setCV({
      ...cv,
      languages: updatedLanguages
    });
  };

  // Certificate handlers
  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      description: ''
    };
    setCV({
      ...cv,
      certificates: [...cv.certificates, newCertificate]
    });
  };

  const handleCertificateChange = (index: number, field: keyof Certificate, value: any) => {
    const updatedCertificates = [...cv.certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    setCV({
      ...cv,
      certificates: updatedCertificates
    });
  };

  const handleRemoveCertificate = (index: number) => {
    const updatedCertificates = [...cv.certificates];
    updatedCertificates.splice(index, 1);
    setCV({
      ...cv,
      certificates: updatedCertificates
    });
  };

  // Project handlers
  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      technologies: []
    };
    setCV({
      ...cv,
      projects: [...cv.projects, newProject]
    });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...cv.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setCV({
      ...cv,
      projects: updatedProjects
    });
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...cv.projects];
    updatedProjects.splice(index, 1);
    setCV({
      ...cv,
      projects: updatedProjects
    });
  };

  // Reference handlers
  const handleAddReference = () => {
    const newReference: Reference = {
      id: `ref-${Date.now()}`,
      name: '',
      company: '',
      position: '',
      email: '',
      phone: ''
    };
    setCV({
      ...cv,
      references: [...cv.references, newReference]
    });
  };

  const handleReferenceChange = (index: number, field: keyof Reference, value: any) => {
    const updatedReferences = [...cv.references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    setCV({
      ...cv,
      references: updatedReferences
    });
  };

  const handleRemoveReference = (index: number) => {
    const updatedReferences = [...cv.references];
    updatedReferences.splice(index, 1);
    setCV({
      ...cv,
      references: updatedReferences
    });
  };

  const handleSave = () => {
    onSave({
      ...cv,
      updatedAt: new Date().toISOString()
    });
  };

  // Array of tab items for easier mapping
  const tabItems = [
    { id: 'personal', icon: <User />, label: 'Personal' },
    { id: 'experience', icon: <Briefcase />, label: 'Experience' },
    { id: 'education', icon: <GraduationCap />, label: 'Education' },
    { id: 'skills', icon: <Code />, label: 'Skills' },
    { id: 'languages', icon: <Languages />, label: 'Languages' },
    { id: 'certificates', icon: <Award />, label: 'Certificates' },
    { id: 'projects', icon: <FileText />, label: 'Projects' },
    { id: 'references', icon: <BookOpen />, label: 'References' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel} className="md:flex hidden">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button variant="ghost" size="icon" onClick={onCancel} className="md:hidden">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold truncate max-w-[150px] md:max-w-none">
              {cv.name || 'Untitled CV'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {!isMobile && (
              <Button variant="outline" size="sm" onClick={() => onExport(cv, 'pdf')}>
                <Download className="h-4 w-4 mr-2" />
                <span>Export PDF</span>
              </Button>
            )}
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              <span className={isMobile ? "hidden" : "inline"}>Save</span>
            </Button>
            {isMobile && (
              <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-4/5 max-w-xs bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => onExport(cv, 'pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Separator />
              <div className="space-y-1">
                {tabItems.map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {/* Desktop Tabs */}
        <div className="hidden md:block mb-6">
          <ScrollArea className="w-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex w-full h-auto p-1 overflow-x-auto">
                  {tabItems.map(tab => (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-2 py-2.5 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </ScrollArea>
        </div>

        {/* Mobile Tab Indicator */}
        {isMobile && (
          <div className="mb-4 flex items-center">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium">
              {tabItems.find(tab => tab.id === activeTab)?.icon}
              <span>{tabItems.find(tab => tab.id === activeTab)?.label}</span>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 md:p-6"
            >
              {/* Personal Info */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-none">
                      <CardHeader className="pb-2 px-2">
                        <CardTitle className="text-lg">Personal Details</CardTitle>
                        <CardDescription>Your basic information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input 
                              name="firstName"
                              placeholder="First name"
                              value={cv.personalInfo.firstName}
                              onChange={handlePersonalInfoChange}
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input 
                              name="lastName"
                              placeholder="Last name"
                              value={cv.personalInfo.lastName}
                              onChange={handlePersonalInfoChange}
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Professional Title</label>
                          <Input 
                            name="title"
                            placeholder="e.g. Senior Software Engineer"
                            value={cv.personalInfo.title}
                            onChange={handlePersonalInfoChange}
                            className="w-full"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-none">
                      <CardHeader className="pb-2 px-2">
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                        <CardDescription>How employers can reach you</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 px-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input 
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={cv.personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input 
                            name="phone"
                            placeholder="+1 123 456 7890"
                            value={cv.personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Input 
                            name="address"
                            placeholder="City, Country"
                            value={cv.personalInfo.address}
                            onChange={handlePersonalInfoChange}
                            className="w-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-none shadow-none">
                    <CardHeader className="pb-2 px-2">
                      <CardTitle className="text-lg">Online Presence</CardTitle>
                      <CardDescription>Links to your professional profiles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 px-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Website</label>
                        <Input 
                          name="website"
                          placeholder="yourwebsite.com"
                          value={cv.personalInfo.website}
                          onChange={handlePersonalInfoChange}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">LinkedIn</label>
                        <Input 
                          name="linkedin"
                          placeholder="linkedin.com/in/yourprofile"
                          value={cv.personalInfo.linkedin}
                          onChange={handlePersonalInfoChange}
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader className="pb-2 px-2">
                      <CardTitle className="text-lg">Professional Summary</CardTitle>
                      <CardDescription>A brief overview of your professional background</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <div className="space-y-2">
                        <Textarea 
                          name="summary"
                          placeholder="I am a passionate professional with experience in..."
                          value={cv.personalInfo.summary}
                          onChange={handlePersonalInfoChange}
                          rows={5}
                          className="w-full resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Experience Section */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Work Experience</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add your professional history</p>
                    </div>
                    <Button
                      onClick={handleAddExperience}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.experience.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <Briefcase className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No work experience added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding your work history to create an impressive CV</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddExperience}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cv.experience.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-b">
                              <h3 className="font-medium">{exp.position || 'New Experience'}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExperience(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Company</label>
                                  <Input
                                    placeholder="Company name"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Position</label>
                                  <Input
                                    placeholder="Job title"
                                    value={exp.position}
                                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Location</label>
                                  <Input
                                    placeholder="City, Country"
                                    value={exp.location}
                                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Date</label>
                                    <Input
                                      type="date"
                                      value={exp.startDate}
                                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">End Date</label>
                                    <Input
                                      type="date"
                                      value={exp.endDate}
                                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                      disabled={exp.isCurrent}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <label className="text-sm font-medium">Description</label>
                                  <Textarea
                                    placeholder="Describe your responsibilities and achievements..."
                                    value={exp.description}
                                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                    rows={4}
                                    className="resize-none"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Education Section */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Education</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add your academic background</p>
                    </div>
                    <Button
                      onClick={handleAddEducation}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.education.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <GraduationCap className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No education added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding your educational background</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddEducation}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cv.education.map((edu, index) => (
                        <motion.div
                          key={edu.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-b">
                              <h3 className="font-medium">{edu.institution || 'New Education'}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveEducation(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Institution</label>
                                  <Input
                                    placeholder="University/School name"
                                    value={edu.institution}
                                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Degree</label>
                                  <Input
                                    placeholder="e.g. Bachelor of Science"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Field of Study</label>
                                  <Input
                                    placeholder="e.g. Computer Science"
                                    value={edu.field}
                                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Location</label>
                                  <Input
                                    placeholder="City, Country"
                                    value={edu.location}
                                    onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Date</label>
                                    <Input
                                      type="date"
                                      value={edu.startDate}
                                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">End Date</label>
                                    <Input
                                      type="date"
                                      value={edu.endDate}
                                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">GPA (optional)</label>
                                  <Input
                                    placeholder="e.g. 3.8/4.0"
                                    value={edu.gpa || ''}
                                    onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <label className="text-sm font-medium">Description (optional)</label>
                                  <Textarea
                                    placeholder="Notable achievements, activities, etc."
                                    value={edu.description}
                                    onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                                    rows={3}
                                    className="resize-none"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Skills Section */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Skills</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add your key abilities and competencies</p>
                    </div>
                    <Button
                      onClick={handleAddSkill}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.skills.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <Code className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No skills added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding your professional skills</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddSkill}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {cv.skills.map((skill, index) => (
                            <motion.div
                              key={skill.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                              <div className="w-full md:flex-1">
                                <Input 
                                  placeholder="Skill name"
                                  value={skill.name}
                                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-full md:w-auto flex items-center gap-2">
                                <div className="text-xs font-medium min-w-16">Proficiency:</div>
                                <select 
                                  className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                                  value={skill.level}
                                  onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                                >
                                  <option value="1">Beginner</option>
                                  <option value="2">Basic</option>
                                  <option value="3">Intermediate</option>
                                  <option value="4">Advanced</option>
                                  <option value="5">Expert</option>
                                </select>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveSkill(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={handleAddSkill}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Skill
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Languages Section */}
              {activeTab === 'languages' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Languages</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add languages you speak</p>
                    </div>
                    <Button
                      onClick={handleAddLanguage}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.languages.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <Languages className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No languages added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding languages you speak</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddLanguage}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {cv.languages.map((language, index) => (
                            <motion.div
                              key={language.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-wrap md:flex-nowrap items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                              <div className="w-full md:flex-1">
                                <Input 
                                  placeholder="Language name"
                                  value={language.name}
                                  onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="w-full md:w-auto flex items-center gap-2">
                                <div className="text-xs font-medium min-w-16">Proficiency:</div>
                                <select 
                                  className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                                  value={language.proficiency}
                                  onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                                >
                                  <option value="Basic">Basic</option>
                                  <option value="Conversational">Conversational</option>
                                  <option value="Fluent">Fluent</option>
                                  <option value="Native">Native</option>
                                </select>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveLanguage(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={handleAddLanguage}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Language
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Certificates Section */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Certificates</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add your certifications and credentials</p>
                    </div>
                    <Button
                      onClick={handleAddCertificate}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.certificates.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <Award className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No certificates added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding your professional certifications</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddCertificate}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certificate
                      </Button>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {cv.certificates.map((certificate, index) => (
                            <motion.div
                              key={certificate.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg items-center"
                            >
                              <div className="md:col-span-5">
                                <div className="text-xs font-medium mb-1">Certificate Name</div>
                                <Input 
                                  placeholder="Certificate name"
                                  value={certificate.name}
                                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="md:col-span-4">
                                <div className="text-xs font-medium mb-1">Issuer</div>
                                <Input 
                                  placeholder="Issuing organization"
                                  value={certificate.issuer}
                                  onChange={(e) => handleCertificateChange(index, 'issuer', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <div className="text-xs font-medium mb-1">Issue Date</div>
                                <Input 
                                  type="date"
                                  value={certificate.date}
                                  onChange={(e) => handleCertificateChange(index, 'date', e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="md:col-span-1 flex justify-end">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleRemoveCertificate(index)}
                                  className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="md:col-span-12">
                                <div className="text-xs font-medium mb-1">Description (optional)</div>
                                <Textarea 
                                  placeholder="Briefly describe this certification..."
                                  value={certificate.description}
                                  onChange={(e) => handleCertificateChange(index, 'description', e.target.value)}
                                  className="w-full resize-none"
                                  rows={2}
                                />
                              </div>
                            </motion.div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={handleAddCertificate}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Another Certificate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Projects Section */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Projects</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add your personal or professional projects</p>
                    </div>
                    <Button
                      onClick={handleAddProject}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.projects.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <FileText className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No projects added</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding your notable projects</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddProject}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cv.projects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-b">
                              <h3 className="font-medium">{project.name || 'New Project'}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveProject(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Project Name</label>
                                  <Input
                                    placeholder="Project name"
                                    value={project.name}
                                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Date</label>
                                    <Input
                                      type="date"
                                      value={project.startDate}
                                      onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">End Date</label>
                                    <Input
                                      type="date"
                                      value={project.endDate}
                                      onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <label className="text-sm font-medium">Technologies Used</label>
                                  <Input
                                    placeholder="e.g. React, Node.js, Python"
                                    value={project.technologies.join(', ')}
                                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <label className="text-sm font-medium">Description</label>
                                  <Textarea
                                    placeholder="Describe the project, your role, and outcomes..."
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                    rows={4}
                                    className="resize-none"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={handleAddProject}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Project
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* References Section */}
              {activeTab === 'references' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">References</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add professional references</p>
                    </div>
                    <Button
                      onClick={handleAddReference}
                      variant="outline"
                      className="flex items-center gap-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </Button>
                  </div>

                  {cv.references.length === 0 ? (
                    <div className="text-center py-12 px-4 border border-dashed rounded-lg">
                      <BookOpen className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-sm font-medium">No references added</h3>
                      <p className="mt-1 text-sm text-gray-500">Add people who can vouch for your professional abilities</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={handleAddReference}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Reference
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cv.references.map((reference, index) => (
                        <motion.div
                          key={reference.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-b">
                              <h3 className="font-medium">{reference.name || 'New Reference'}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveReference(index)}
                                className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Full Name</label>
                                  <Input
                                    placeholder="Reference's name"
                                    value={reference.name}
                                    onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Company</label>
                                  <Input
                                    placeholder="Company name"
                                    value={reference.company}
                                    onChange={(e) => handleReferenceChange(index, 'company', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Position</label>
                                  <Input
                                    placeholder="Job title"
                                    value={reference.position}
                                    onChange={(e) => handleReferenceChange(index, 'position', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Email</label>
                                  <Input
                                    type="email"
                                    placeholder="contact@example.com"
                                    value={reference.email}
                                    onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Phone</label>
                                  <Input
                                    placeholder="+1 123 456 7890"
                                    value={reference.phone}
                                    onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Relationship</label>
                                  <Input
                                    placeholder="e.g. Former Manager, Colleague"
                                    value={reference.relationship || ''}
                                    onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={handleAddReference}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Reference
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Action Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center z-20">
          <Button size="sm" onClick={onCancel} variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      )}
    </div>
  );
};
