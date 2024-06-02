package pl.polsl.project.restaurantmanagement.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserAuthenticationEntryPoint authenticationEntryPoint;
    private final UserAuthProvider userAuthProvider;

    @Value("${security.disable-auth}")
    private boolean disableAuth;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        if (disableAuth) {
            http
                    .cors(AbstractHttpConfigurer::disable)
                    .csrf(AbstractHttpConfigurer::disable)
                    .sessionManagement(sessionManagement ->
                            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .authorizeHttpRequests(authorizeRequests ->
                            authorizeRequests.anyRequest().permitAll()
                    );
        } else {
            http
                    .exceptionHandling(exceptionHandling ->
                            exceptionHandling.authenticationEntryPoint(authenticationEntryPoint)
                    )
                    .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                    .cors(AbstractHttpConfigurer::disable)
                    .csrf(AbstractHttpConfigurer::disable)
                    .sessionManagement(sessionManagement ->
                            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .authorizeHttpRequests(authorizeRequests ->
                            authorizeRequests
                                    .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/api/menu").permitAll()
                                    .anyRequest().authenticated()
                    );
        }
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/resources/**");
    }
}