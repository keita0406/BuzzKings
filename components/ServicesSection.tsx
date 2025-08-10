import { 
  BoltIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  MegaphoneIcon,
  PresentationChartLineIcon,
  SparklesIcon,
  FilmIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { MotionDiv } from './ClientMotionWrapper'

// アイコンマッピング
const iconMap = {
  ChartBarIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  UserGroupIcon,
  BoltIcon,
  FilmIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
  SparklesIcon
}

interface Service {
  icon: string
  title: string
  description: string
  features: string[]
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - SSR */}
        <div className="text-center mb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">サービス</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SNSの力で、あなたのビジネスを加速させます
            </p>
          </MotionDiv>
        </div>

        {/* Services Grid - SSR Content with Client Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || ChartBarIcon
            
            return (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                {/* Title - SEO重要 */}
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {service.title}
                </h3>

                {/* Description - SEO重要 */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features - SEO重要 */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}