import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "LinkSphere",
      description: "A link management system for storing and organizing links",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Rust", "Axum", "Docker","GitHub"],
      image: "/src/assets/linksphere.png",
      liveUrl: "https://linksphere-98u3.onrender.com/",
      githubUrl: "https://github.com/Vitalisn4/LinkSphere.git",
      featured: true,
      category: "Web App",
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    technologies: [],
    image: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "Web App",
  });

  const categories = ["Web App", "3D/WebGL", "AI/ML", "Data Viz", "Mobile"];

  const handleEdit = (project: Project) => {
    setIsEditing(project.id);
    setEditForm(project);
  };

  const handleSave = () => {
    if (isEditing) {
      setProjects(projects.map(p => 
        p.id === isEditing ? { ...p, ...editForm } : p
      ));
      setIsEditing(null);
      setEditForm({});
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
    }
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleCreate = () => {
    const id = Date.now().toString();
    setProjects([...projects, { ...newProject, id } as Project]);
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      image: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      category: "Web App",
    });
    setIsCreating(false);
    toast({
      title: "Project created",
      description: "The new project has been successfully created.",
    });
  };

  const handleTechAdd = (tech: string, isEdit = false) => {
    if (isEdit && isEditing) {
      const currentTech = editForm.technologies || [];
      if (!currentTech.includes(tech)) {
        setEditForm({
          ...editForm,
          technologies: [...currentTech, tech]
        });
      }
    } else if (!isEdit) {
      const currentTech = newProject.technologies || [];
      if (!currentTech.includes(tech)) {
        setNewProject({
          ...newProject,
          technologies: [...currentTech, tech]
        });
      }
    }
  };

  const handleTechRemove = (tech: string, isEdit = false) => {
    if (isEdit && isEditing) {
      setEditForm({
        ...editForm,
        technologies: (editForm.technologies || []).filter(t => t !== tech)
      });
    } else if (!isEdit) {
      setNewProject({
        ...newProject,
        technologies: (newProject.technologies || []).filter(t => t !== tech)
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio projects</p>
            </div>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-gradient-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{projects.filter(p => p.featured).length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{projects.filter(p => p.liveUrl).length}</div>
              <div className="text-sm text-muted-foreground">Live Demos</div>
            </div>
            <div className="glass rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>

          {/* Create New Project Modal */}
          {isCreating && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Create New Project</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Live URL</label>
                      <Input
                        value={newProject.liveUrl}
                        onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">GitHub URL</label>
                      <Input
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Technologies</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(newProject.technologies || []).map(tech => (
                        <Badge key={tech} variant="secondary" className="cursor-pointer"
                          onClick={() => handleTechRemove(tech, false)}>
                          {tech} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Type technology and press Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value = (e.target as HTMLInputElement).value.trim();
                          if (value) {
                            handleTechAdd(value, false);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate} className="bg-gradient-primary">
                    Create Project
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Project</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Technologies</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border/20">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{project.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map(tech => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {project.featured && (
                            <Badge variant="default" className="text-xs">Featured</Badge>
                          )}
                          {project.liveUrl && (
                            <Badge variant="outline" className="text-xs">Live</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {project.liveUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;