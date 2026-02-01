'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Users, Flame, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const recipes = [
  {
    id: '1',
    title: 'Dal Makhani',
    description: 'Creamy, buttery black lentils simmered to perfection',
    prepTime: 30,
    cookTime: 60,
    servings: 4,
    difficulty: 'Medium',
    isVegetarian: true,
  },
  {
    id: '2',
    title: 'Paneer Butter Masala',
    description: 'Rich tomato-based curry with soft paneer cubes',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    isVegetarian: true,
  },
  {
    id: '3',
    title: 'Biryani',
    description: 'Fragrant rice layered with aromatic spices',
    prepTime: 45,
    cookTime: 60,
    servings: 6,
    difficulty: 'Hard',
    isVegetarian: false,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: 'text-green-600',
  Medium: 'text-cook',
  Hard: 'text-red-600',
};

export function RecipeCollection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recipe Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tried, tested, and loved recipes from my kitchen to yours
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/blog?type=recipe">
              All Recipes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl border bg-card hover:bg-cook/5 hover:border-cook/30 transition-all duration-300"
            >
              {/* Placeholder image area */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-cook/20 to-cook/5 mb-4 flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-cook/30" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                {recipe.isVegetarian && (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Veg
                  </Badge>
                )}
                <span className={`text-sm font-medium ${difficultyColors[recipe.difficulty]}`}>
                  {recipe.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 group-hover:text-cook transition-colors">
                {recipe.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">{recipe.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>

              <Link
                href={`/blog/recipes/${recipe.id}`}
                className="inline-flex items-center mt-4 text-cook hover:underline"
              >
                View Recipe
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
